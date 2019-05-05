import java.text.DecimalFormat;
import java.util.*;

public class Main {
	public static void main(String args[]) {
		Scanner s = new Scanner(System.in);
		int t = s.nextInt(), c = 1;		
		
		double g = 9.8;
		DecimalFormat df = new DecimalFormat("0.0000000");
		while (c <= t) {
			int v = s.nextInt();
			int d = s.nextInt();
			double temp = g*d/(v*v);
			if (temp > 1) temp = 1;
			temp = Math.asin(temp);
			double theda = temp/2;
			theda *= 180/Math.PI;
			System.out.println("Case #" + (c++) + ": " + df.format(theda));
		}
	}
}