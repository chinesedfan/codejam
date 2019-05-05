import java.util.*;
import java.math.*;

public class A {
	public static void main(String[] args) {
		Scanner s = new Scanner(System.in);
		int total = s.nextInt();
		int current = 1;
		while (current <= total) {
			int n = s.nextInt();
			int x = s.nextInt();
			int files[] = new int[n];
			for (int i = 0; i < files.length; i++) {
				files[i] = s.nextInt();
			}
			Arrays.sort(files);
			
			int result = 0;
			int i = 0, j = files.length - 1;
			while (i < j) {
				if (files[i]+files[j] <= x) {
					i++;
					j--;
					result++;
				} else {
					j--;
					result++;
				}
			}
			if (i == j) result++;
			System.out.printf("Case #%d: %s\n", (current++), result);			
		}
	}
}
