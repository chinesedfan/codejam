import java.util.*;
import java.math.*;

public class B {
	public static void main(String args[]) {
		Scanner s = new Scanner(System.in);
		int t = s.nextInt(), c = 1;		
		
		while (c <= t) {
			int id = s.nextInt();
			System.out.print("Case #" + (c++) + ":");
			if (id == 1) {
				BigInteger n = s.nextBigInteger();
				printN2PQ(n);
			} else if (id == 2) {
				BigInteger p = s.nextBigInteger();
				BigInteger q = s.nextBigInteger();
				printPQ2N(p, q);
			}
			System.out.println();
		}
	}
	
	static void printN2PQ(BigInteger n) {
		BigInteger p = BigInteger.ONE;
		BigInteger q = BigInteger.ONE;
		for (int i = 1; i < n.bitLength(); i++) {
			if (n.testBit(n.bitLength()-1-i)) {
				p = p.add(q);
			} else {
				q = q.add(p);
			}
		}
		System.out.print(" " + p + " " + q);
	}
	
	static void printPQ2N(BigInteger p, BigInteger q) {
		BigInteger n = BigInteger.ZERO;
		BigInteger add = BigInteger.ONE;
		BigInteger two = new BigInteger("2");
		while (p.compareTo(q) != 0) {
			if (p.compareTo(q) > 0) { // right child-node
				p = p.subtract(q);
				n = n.add(add);
			} else {
				q = q.subtract(p);
			}
			add = add.multiply(two);
		}
		n = n.add(add);
		System.out.print(" " + n);
	}
}