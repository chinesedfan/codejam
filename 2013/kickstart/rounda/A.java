import java.util.*;

public class A {
	public static void main(String args[]) {
		Scanner s = new Scanner(System.in);
		int t = s.nextInt(), c = 1;		
		
		while (c <= t) {
			System.out.print("Case #" + (c++) + ":");
			
			String phone = s.next();
			String format = s.next();
			// parse the format
			String[] tokens = format.split("-");
			int start = 0;
			for (int i = 0; i < tokens.length; i++) {
				int num = Integer.parseInt(tokens[i]);
				printPhone(phone, start, num);
				start += num;
			}
			System.out.println();
		}
	}
	
	public static void printPhone(String phone, int start, int num) {
		char cur = phone.charAt(start);
		int count = 1;
		for (int i = 1; i < num; i++) {
			if (phone.charAt(start+i) == cur) {
				count++;
			} else {
				printNumber(cur, count);
				cur = phone.charAt(start+i);
				count = 1;
			}
		}
		printNumber(cur, count);
	}
	
	static String[] COUNT = {"", "", "double", "triple", "quadruple", "quintuple",
		"sextuple", "septuple", "octuple", "nonuple", "decuple"};
	static String[] NUMBER = {"zero", "one", "two", "three", "four", "five", 
		"six", "seven", "eight", "nine"};
	public static void printNumber(char cur, int count) {
		if (count > 10) {
			for (int i = 0; i < count; i++) {
			    printNumber(cur, 1);
			}
		} else if (count == 1) {
			System.out.print(" " + NUMBER[cur-'0']);
		} else {
			System.out.print(" " + COUNT[count] + " " + NUMBER[cur-'0']);
		}
	}
}