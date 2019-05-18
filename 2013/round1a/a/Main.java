import java.util.*;

public class Main {
	public static void main(String[] args) {
		Scanner s = new Scanner(System.in);
		int t = s.nextInt();
		int c = 1;
		while (c <= t) {
			long r = s.nextLong();	
			long total = s.nextLong();	

			long min = 1;
			long max = 1;
			while (f(r, max) <= total) max = max << 1;

			// binary search			
			while (max >= min) {
				long middle = min + (max - min) / 2;
				if (f(r, middle) <= total) {
					min = middle + 1;	
				} else {
					max = middle - 1;	
				}
			}

			System.out.println("Case #" + (c++) + ": " + max);
		}
	}

	public static long f(long r, long n) {
		// for each ring that has r as white radius,
		// the cost is (r + 1)^2 - r^2 = 2r + 1
		// so, suppose the last white disk is r + 2 * (n - 1), then the sum is,
		// sum(2 * (r + 2 * (i - 1)) + 1), where i = [1, n]
		// = 2 * (n * r + n * (n - 1)) + n
		// = 2 * n^2 + 2 * n * r - n
		return 2 * n * n + 2 * n * r - n;
	}
}
