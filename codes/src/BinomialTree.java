import java.io.ByteArrayOutputStream;
import java.io.PrintStream;


public class BinomialLattice {
    public static enum OptionType{
        BAD_OPTION,
        CALL,
        PUT,
        AMERICAN_PUT
    }
    
    protected static class LatticeElem {
        private double strike;
        private double call;
        private double put;

        public LatticeElem() {
            strike = 0;
            call = 0;
            put = 0;
        }
        public String toString()
        {
            ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
            PrintStream ostream = new PrintStream( byteStream );
            ostream.printf("[S:%6.2f, C:%6.2f, P:%6.2f]", strike, call, put);
            String s = byteStream.toString();
            ostream.close();
            return s;
        }
        
        public double getStrike() {
            return strike;
        }
        public void setStrike(double strike) {
            this.strike = strike;
        }
        public double getCall() {
            return call;
        }
        public void setCall(double call) {
            this.call = call;
        }
        public double getPut() {
            return put;
        }
        public void setPut(double put) {
            this.put = put;
        }
    }
    
    protected LatticeElem lattice[][];
    
    public BinomialLattice(final int xdim, final int ydim)
    {
        lattice = new LatticeElem[ydim][xdim];
        int n = xdim;
        for (int j = 0; j < ydim; j++) {
            for (int i = 0; i < xdim; i++) {
                if (i < n) {
                    lattice[j][i] = new LatticeElem();
                }
                else {
                    lattice[j][i] = null;
                }
            }
            n--;
        }
    }
    
    
    protected void toStream(PrintStream ostream) {
       int ydim = lattice.length;
       int xdim = lattice[0].length;
       int n = xdim;
       for (int j = 0; j < ydim; j++) {
           for (int i = 0; i < n; i++) {
               if (lattice[j][i] != null ) {
                   ostream.print( lattice[j][i] + " ");
               }
           }  // for i
           n--;
           ostream.println();
       } // for j
    }

    
    public String toString()
    {
        ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
        PrintStream ostream = new PrintStream( byteStream );
        toStream(ostream );
        String s = byteStream.toString();
        ostream.close();
        return s;
    }
    
    protected void buildLattice(final double S, final double u, final double d)
    {
        double curStrike = S;
        int n = lattice[0].length;
        for (int j = 0; j < lattice.length; j++) {
            lattice[j][0].setStrike( curStrike );
            for (int i = 1; i < n; i++) {
                double newStrike = lattice[j][i-1].getStrike() * u;
                lattice[j][i].setStrike(newStrike);
            } // for i
            n--;
            curStrike = curStrike * d;
        } // for j
    }
    
    
    protected void buildFarEdge(final double K, final OptionType type )
    {
        int n = lattice[0].length - 1;
        for (int j = 0; j < lattice.length; j++) {
            double S = lattice[j][n].getStrike();
            if (type == OptionType.CALL) {
                double val = Math.max(0, S - K);
                lattice[j][n].setCall( val );
            }
            else {
                double val = Math.max(0, K - S);
                lattice[j][n].setPut( val );
            }

            n--;
        }
    }
    
    
    protected void buildMiddle(final double K, final double q, final double R, final OptionType type )
    {
        int n = lattice[0].length;
        for (int i = n-2; i >= 0; i--) {
            for (int j = 0; j <= i; j++) {
                // System.out.print("[" + j + "][" + (i - j) + "] ");
                int row = j;
                int col = i - j;
                double upVal = 0.0;
                double downVal = 0.0;
                if (type == OptionType.CALL) {
                    upVal = lattice[row][col+1].getCall();
                    downVal = lattice[row+1][col].getCall();
                }
                else {
                    upVal = lattice[row][col+1].getPut();
                    downVal = lattice[row+1][col].getPut();
                }
                double val = (q * upVal + (1 - q) * downVal) / R;
                switch (type) {
                case CALL:
                    lattice[row][col].setCall(val);
                    break;
                case PUT:
                    lattice[row][col].setPut(val);
                    break;
                case AMERICAN_PUT:
                {
                    double localStrike = lattice[row][col].getStrike();
                    double americanPutVal = Math.max(K - localStrike, val);
                    lattice[row][col].setPut(americanPutVal);
                }
                    break;
                default:  // this should never happen
                    System.out.println("ERROR: buildMiddle - bad option type");
                    break;
                }
            }
            // System.out.println();
        }
    }
    
    public void buildOption(final double K, final double q, final double R, final OptionType type) {
        buildFarEdge(K, type );
        buildMiddle(K, q, R, type );
    }

    /**
     * @param args
     */
    public static void main(String[] args) {
        final int N = 6;
        BinomialLattice lattice = new BinomialLattice(N, N);
        final double sigma = 0.20;
        final double dt = 1.0 / 12.0;
        final double sqrtDt = (double)Math.sqrt( dt );
        final double u = (double)Math.exp(sigma * sqrtDt);
        final double d = (double)Math.exp(-sigma * sqrtDt);
        final double R = 1.0 + (0.1/12.0);
        final double q = (R - d)/(u - d);
        final double S = 62.0;
        final double K = 60;
        lattice.buildLattice( S, u, d);
        lattice.buildOption(K, q, R, OptionType.CALL );
        lattice.buildOption(K, q, R, OptionType.PUT );
        System.out.println( lattice );
    }

}
