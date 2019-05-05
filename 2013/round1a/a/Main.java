import java.util.*;

public class Main {
	public static void main(String[] args) {
		Scanner s = new Scanner(System.in);
		int t = s.nextInt();
		int c = 1;
		while (c <= t) {
			long r = s.nextLong();	
			r++;
			long total = s.nextLong();	
			int count = 0;
			while (total > 0) {
				long ri = r - 1;
				long temp = (r*r-ri*ri);
//System.out.println(total + " " + temp);
				if (total < temp) break;
				total -= temp;
				r += 2;
				count++;
			}
			System.out.println("Case #" + (c++) + ": " + count);
		}
	}
}
