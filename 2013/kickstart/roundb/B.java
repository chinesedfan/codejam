import java.util.*;

public class B {
	public static void main(String args[]) {
		Scanner s = new Scanner(System.in);
		int t = s.nextInt(), c = 1;		
		
		while (c <= t) {
			int n = s.nextInt(); // how many blocks
			Vector<Block> vec = new Vector<Block>();
			for (int i = 0; i < n; i++) {
				vec.add(new Block(s.nextInt(), s.nextInt(),
						s.nextInt(), s.nextInt()));
			}
			long min = ~(1<<31);
			int x = 0, y = 0;
			for (int v = 0; v < vec.size(); v++) {
				Block b = vec.elementAt(v);
				for (int i = b.x1; i <= b.x2; i++) {
					for (int j = b.y1; j <= b.y2; j++) {
						long sum = getTotal(vec, i, j);
						if (sum < min) {
							x = i;
							y = j;
							min = sum;
						} else if (sum == min) {
							if (i < x) {
								x = i;
								y = j;
							} else if (i == x) {
								if (j < y) y = j;
							}
						}
					}
				}
			}
			String result = x + " " + y + " " + min;
			System.out.println("Case #" + (c++) + ": " + result);
		}
	}
	
	static int getTotal(Vector<Block> vec, int x, int y) {
		int sum = 0;
		for (int i = 0; i < vec.size(); i++) {
			sum += vec.elementAt(i).getTotalDistance(x, y);
		}
		return sum;
	}
}

class Block {
	int x1, y1, x2, y2;
	Block(int x1, int y1, int x2, int y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}
	
	long getTotalDistance(int x, int y) {
		long sum = 0;
		for (int i = x1; i <= x2; i++) {
			for (int j = y1; j <= y2; j++) {
				sum += Math.abs(i-x) + Math.abs(j-y);
			}
		}
		return sum;
	}
}