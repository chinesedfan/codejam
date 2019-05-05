import java.text.DecimalFormat;
import java.util.*;

public class Main {
	public static void main(String args[]) {
		Scanner s = new Scanner(System.in);
		int t = s.nextInt(), c = 1;		
		
		while (c <= t) {
			int n = s.nextInt();
			s.nextLine(); // skip
			
			Vector<String> vec = new Vector<String>();
			for (int i = 0; i < n; i++) {
				vec.add(s.nextLine());
			}
			
			int result = 0;
			for (int i = 0; i < n; i++) {
				String cur = vec.elementAt(i);
				for (int j = 0; j < i; j++) {
					String other = vec.elementAt(j);
					if (cur.compareTo(other) < 0) {
						result++;
						vec.insertElementAt(cur, j);
						vec.remove(i+1); // tricky
						break;
					}
				}
			}
			System.out.println("Case #" + (c++) + ": " + result);
		}
	}
}