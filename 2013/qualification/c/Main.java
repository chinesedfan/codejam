import java.util.*;
import java.math.*;

public class Main {
	public static Vector<BigInteger> vec;
    public static void main(String args[]) {
		Scanner s = new Scanner(System.in);
		
		vec = new Vector<BigInteger>();
		do_prepare();
		
		int t = s.nextInt(), c = 1;
		while (c <= t) {
			BigInteger n = s.nextBigInteger();
			BigInteger m = s.nextBigInteger();
			
			int count = func(n, m);
			System.out.println("Case #" + (c++) + ": " + count);
		}
	}
    
    public static int func(BigInteger start, BigInteger end) {
    	int count = 0; 
    	for (int i = 0; i < vec.size(); i++){
    		if (vec.elementAt(i).compareTo(start) >= 0 && vec.elementAt(i).compareTo(end) <= 0) {
    			count++;
    		}
    	}
    	return count;
    }
    
    public static void do_prepare() {
    	char[] half = new char[51];
    	int lef = half.length - 1;
    	int pos = half.length - 1; // update which bit ?
    	for (int i = 0; i < half.length; i++) half[i] = '0';
    	half[pos]++;
    	
    	BigInteger sqrt;
    	BigInteger max = BigInteger.TEN.pow(101);

    	boolean odd = true;
    	
    	sqrt = new BigInteger(new String(half));
    	while (sqrt.compareTo(max) <= 0) {
    		BigInteger bHalf = new BigInteger(new String(half));
    		BigInteger root = new BigInteger(getP(bHalf.toString(), odd));
    		
    		sqrt = root.pow(2);
    		if (isP(sqrt.toString())) {
    			vec.add(sqrt);
    			half[pos]++; // not possible to be '9'
        		//System.out.println(root.toString());
    		} else {
    			while(half[pos] == '0') pos--;
    			if (pos == lef) {
    				if (!odd) {
    					if (--lef == 0) break;
    				}
    				half[lef] = '1';
					clearBit(half, lef);
    				odd = !odd;
    				pos = half.length - 1;
    			} else {
    				half[pos-1]++;
    				clearBit(half, pos-1);
    				pos = half.length - 1;
    			}
    		}
    	}
    }
    
    public static void clearBit(char[] half, int pos) {
    	for (int i = pos+1; i < half.length; i++) half[i] = '0';
    }
    
    public static boolean isP(String s) {
    	for (int i = 0; i < s.length()/2; i++) {
    		if (s.charAt(i) != s.charAt(s.length()-1-i)) return false;
    	}
    	return true;
    }
    
    // say "abc" => "abcba"(odd)/"abccba"(even)
    public static String getP(String s, boolean odd) {
    	int len = odd ? s.length()*2-1 : s.length()*2;
    	int half = len/2;    	
    	
    	char[] cs = new char[len];
    	if (odd) cs[half] = s.charAt(half);
    	for (int i = 0; i < half; i++) {
    		cs[i] = cs[cs.length-1-i] = s.charAt(i);
    	}
    	return new String(cs);
    }
}