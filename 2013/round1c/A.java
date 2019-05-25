import java.util.*;

public class A {
	public static void main(String args[]) {
		Scanner s = new Scanner(System.in);
		int t = s.nextInt(), c = 1;
		while (c <= t) {
			String name = s.next();
			int n = s.nextInt();
			
			Vector<Integer> vec = new Vector<Integer>();
			int[] count = new int[name.length()];
			int[] end = new int[name.length()];
			for (int i = 0; i < name.length(); i++) {
				end[i] = -1;
				if (notVowel(name.charAt(i))) {
					if (i == 0) {
						count[i] = 1;
					} else {
						count[i] = count[i-1] + 1;
					}
				} else {
					count[i] = 0;	
				}
				//System.out.println(count[i]);

				vec.add(i);

				int ci = count[i];
				if (ci >= n) {
					while (vec.size() > 0) {
						int top = vec.elementAt(0);

						int d = i - top + 1;
						int rc = d < ci ? d : ci;
						if (rc >= n) {
							end[top] = i;
				// System.out.println(top + " " + end[top]);
							vec.removeElementAt(0);	
						} else break;
					}
				}
			}

			
			int result = 0;
			for (int i = 0; i < name.length(); i++) {
				if (end[i] >= 0) {
					result += name.length() - end[i];
				}
			}
			System.out.println("Case #" + (c++) + ": " + result);
		}
	}
	
	public static boolean notVowel(char c) {
		return !(c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u');
	}
}
