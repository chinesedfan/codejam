package codejam1c;

import java.util.Scanner;

public class A {
	public static void main(String args[]) {
		Scanner s = new Scanner(System.in);
		int t = s.nextInt(), c = 1;
		while (c <= t) {
			String name = s.next();
			int n = s.nextInt();
			
			int[] count = new int[name.length()];
			for (int i = 0; i < name.length(); i++) {
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
			}
			
			
			int result = 0;
			for (int start = 0; start <= name.length()-n; start++) {
				for (int end = start+n; end <= name.length(); end++) {
					//System.out.println(start + " " + end);
					for (int i = start+n-1; i < end; i++) {
						if (count[i] >= n) {
							result++;
							break;
						}
					}
				}
			}
			System.out.println("Case #" + (c++) + ": " + result);
		}
	}
	
	public static boolean notVowel(char c) {
		return !(c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u');
	}
}
