import java.util.*;

public class A {
	public static void main(String args[]) {
		Scanner s = new Scanner(System.in);
		int t = s.nextInt(), c = 1;		
		
		while (c <= t) {
			int n = s.nextInt();
			int[][] matrix = new int[n*n][n*n];
			for (int i = 0; i < matrix.length; i++) {
				for (int j = 0; j < matrix[0].length; j++) {
					matrix[i][j] = s.nextInt();
				}
			}
					
			String result = check(matrix, n) ? "Yes" : "No";
			System.out.println("Case #" + (c++) + ": " + result);
		}
	}
	
	public static boolean check(int[][] matrix, int n) {
		HashMap m1 = new HashMap();
		HashMap m2 = new HashMap();
		HashMap m3 = new HashMap();
		
		for (int i = 0; i < matrix.length; i++) {
			m1.clear();
			m2.clear();
			m3.clear();
			for (int j = 0; j < matrix.length; j++) {
				if (!checkMap(n*n, m1, matrix[i][j])) return false;
				if (!checkMap(n*n, m2, matrix[j][i])) return false;
				if (!checkMap(n*n, m3, matrix[i/n*n + j/n][i%n*n + j%n])) return false;				
			}
		}
		return true;
	}
	
	public static boolean checkMap(int max, HashMap m, int val) {
		if (val < 1 || val > max) return false;
		if (m.containsKey(val)) return false;
		m.put(val, 1);
		return true;
	}
}