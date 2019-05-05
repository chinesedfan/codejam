import java.util.*;
import java.math.*;

public class B {
	public static void main(String[] args) {
		Scanner s = new Scanner(System.in);
		int total = s.nextInt();
		int current = 1;
		while (current <= total) {
			int n = s.nextInt();
			String dirStr = s.next();
			
			int grid[][] = new int[n][n];
			for (int i = 0; i< grid.length; i++) {
				for (int j = 0; j < grid.length; j++) {
					grid[i][j] = s.nextInt();
				}
			}
			
			int arr[] = new int[grid.length];
			if (dirStr.equals("right")) {
				for (int i = 0; i< grid.length; i++) {
					Stack<Integer> stack = merge(grid[i]);
					for (int j = 0; j < grid.length; j++) {
						grid[i][j] = stack.pop();
					}
				}
			}
			if (dirStr.equals("left")) {
				for (int i = 0; i< grid.length; i++) {
					for (int j = 0; j < grid.length; j++) {
						arr[grid.length-1-j] = grid[i][j];
					}
					
					Stack<Integer> stack = merge(arr);
					for (int j = 0; j < grid.length; j++) {
						grid[i][grid.length-1-j] = stack.pop();
					}
				}
			}
			if (dirStr.equals("down")) {
				for (int i = 0; i< grid.length; i++) {
					for (int j = 0; j < grid.length; j++) {
						arr[j] = grid[j][i];
					}
					
					Stack<Integer> stack = merge(arr);
					for (int j = 0; j < grid.length; j++) {
						grid[j][i] = stack.pop();
					}
				}
			}
			if (dirStr.equals("up")) {
				for (int i = 0; i< grid.length; i++) {
					for (int j = 0; j < grid.length; j++) {
						arr[grid.length-1-j] = grid[j][i];
					}
					
					Stack<Integer> stack = merge(arr);
					for (int j = 0; j < grid.length; j++) {
						grid[grid.length-1-j][i] = stack.pop();
					}
				}
			}
			
			System.out.printf("Case #%d:\n", (current++));
			for (int i = 0; i< grid.length; i++) {
				System.out.print(grid[i][0]);
				for (int j = 1; j < grid.length; j++) {
					System.out.print(" " + grid[i][j]);
				}
				System.out.println();
			}
		}
	}
	
	static Stack<Integer> merge(int arr[]) { // default is to right
		Stack<Integer> stack = new Stack<Integer>();
		boolean flag = false;
		for (int i = arr.length - 1; i >= 0; i--) {
			if (arr[i] == 0) continue;
			
			if (!stack.empty() && !flag && stack.peek() == arr[i]) {
				int top = stack.pop() * 2;
				stack.push(top);
				flag = true;
			} else {
				stack.push(arr[i]);
				flag = false;
			}
		}
		while (stack.size() != arr.length) stack.push(0);
		return stack;
	}
}
