import java.text.DecimalFormat;
import java.util.*;

public class Main {
	public static void main(String args[]) {
		Scanner s = new Scanner(System.in);
		int t = s.nextInt(), c = 1;		
		
		while (c <= t) {
			int n = s.nextInt();
			
			HashMap<String, Node> map = new HashMap<String, Node>();
			for (int i = 0; i < n; i++) {
				String n1 = s.next();
				String n2 = s.next();
				Node node1 = map.containsKey(n1) ? map.get(n1) : new Node(n1);
				Node node2 = map.containsKey(n2) ? map.get(n2) : new Node(n2);
				node1.others.add(node2);
				node2.others.add(node1);
				if (!map.containsKey(n1)) map.put(n1, node1);
				if (!map.containsKey(n2)) map.put(n2, node2);
			}
			
			// if there has a loop with odd edges
			String result = Node.isOK(map) ? "Yes" : "No";
			System.out.println("Case #" + (c++) + ": " + result);
		}
	}
}

class Node {
	String name;
	Vector<Node> others;
	
	boolean visited;
	int level;
	Node parent;
	Node(String n) {
		name = n;
		others = new Vector<Node>();
		visited = false;
		level = -1;
		parent = null;
	}
	
	static boolean isOK(HashMap<String, Node> map) {
		Iterator<String> iter = map.keySet().iterator();
		while (iter.hasNext()) {
			Node node = map.get(iter.next());
			if (node.visited) continue;
			
			Vector<Node> queue = new Vector<Node>();
			node.level = 0;
			queue.add(node);
			while (!queue.isEmpty()) {
				Node top = queue.elementAt(0);
				queue.remove(0);
				// must be non-visited				
				for (int i = 0; i < top.others.size(); i++) {
					Node child = top.others.elementAt(i);
					if (child == top.parent) continue;
					if (child.visited) {
						int len = top.level + child.level + 1;
						if (len%2 == 1) return false;
					} else {
						child.level = top.level + 1;
						child.visited = true;
						queue.add(child);
					}
				}
			}
		}
		return true;
	}
}