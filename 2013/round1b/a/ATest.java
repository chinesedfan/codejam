import java.util.*;

public class ATest {
	public static void main(String args[]) {
		Scanner s = new Scanner(System.in);
		int t = s.nextInt(), c = 1;
		while (c <= t) {
			int a = s.nextInt();
			int n = s.nextInt();
			int[] other = new int[n];
			for (int i = 0; i < n; i++) other[i] = s.nextInt();
			
			Arrays.sort(other);
			
			int count = 0;
			int totaltime = 0;
			int[] time = new int[n];
			for (int i = 0; i < n; i++) {
				if (other[i] < a) {
					a += other[i];
					time[i] = 0;
				} else if (a == 1){
					count = n - i;
					break;
				} else {
					// try to add
					int temp = a;
					int add = 0;
					while (temp <= other[i]) {
						add++;
						temp = temp * 2 - 1;
					}
					time[i] = add;
					totaltime += time[i];
					a = temp + other[i];
				}
			}
			if (a == 1) {
				System.out.println("Case #" + (c++) + ": " + count);
				continue;
			}
				
			for (int i = 0; i < n; i++) {
				if (time[i] == 0) continue;
				
				if (totaltime - count > n - i) {
					count += n - i;
					break;
				} else {
					count += time[i];
				}
			}
			
			System.out.println("Case #" + (c++) + ": " + count);
		}
	}
}