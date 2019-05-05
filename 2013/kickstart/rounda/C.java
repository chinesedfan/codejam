import java.util.*;

public class C {
	public static void main(String args[]) {
		Scanner s = new Scanner(System.in);
		int t = s.nextInt(), c = 1;		
		
		while (c <= t) {
			int n = s.nextInt();
			int[] worth = new int[n];
			Vector<Integer> vec1 = new Vector<Integer>();
			Vector<Integer> vec2 = new Vector<Integer>();
			
			for (int i = 0; i < n; i++) {
				worth[i] = s.nextInt();
				if (worth[i] % 2 != 0) {
					vec1.add(worth[i]);
				} else {
					vec2.add(worth[i]);
				}
			}
			Collections.sort(vec1);
			Collections.sort(vec2); // must be reversed
			int pos1 = 0;
			int pos2 = vec2.size()-1;
			
			System.out.print("Case #" + (c++) + ":");
			for (int i = 0; i < n; i++) {
				if (worth[i] % 2 != 0) {
					System.out.print(" " + vec1.elementAt(pos1++));
				} else {
					System.out.print(" " + vec2.elementAt(pos2--));
				}
			}
			System.out.println();
		}
	}
}