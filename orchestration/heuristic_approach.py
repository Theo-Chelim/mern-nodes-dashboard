import time
import collections
import json

with open('orchestration/parameters.json') as f:
  data = json.load(f)

Ns = data['Ns']
samples = data['samples']
number_samples = len(samples)

obj_Heuristic = []
time_Heuristic = []

for p in ["1"]:
    from collections import defaultdict

    class Vertex:
        def __init__(self, n):
            self.name = n

    class undirectedGraph:
        vertices = {}
        edges = []
        edge_indices = {}
        List = []
        CPU_S = {}

        def __init__(self, vertices1):
            # No. of vertices
            self.V = vertices1
            # default dictionary to store graph
            self.graph = defaultdict(list)

        def add_vertex(self, vertex, CPU):
            if isinstance(vertex, Vertex) and vertex.name not in self.vertices:
                self.vertices[vertex.name] = vertex
                for row in self.edges:
                    row.append(0)
                self.edges.append([0] * (len(self.edges) + 1))
                self.edge_indices[vertex.name] = len(self.edge_indices)
                self.CPU_S[vertex.name] = CPU
                return True
            else:
                return False

        # function to add an edge to graph
        def add_edge(self, u, v, weight=1):
            if u in self.vertices and v in self.vertices:
                self.edges[self.edge_indices[u]][self.edge_indices[v]] = weight
                self.edges[self.edge_indices[v]][self.edge_indices[u]] = weight
                self.graph[int(u[1:])].append(int(v[1:]))
                self.graph[int(v[1:])].append(int(u[1:]))
                return True
            else:
                return False

        def print_graph(self):
            for v, i in self.edge_indices.items():
                print(v + ' ', end='')
                for j in range(len(self.edges)):
                    print(self.edges[i][j], end=' ')
                print(' ')


    S = undirectedGraph(Ns)
    # Defining the set of vertices
    vertices_dict = {}
    for i in range(1, Ns + 1):
        vertices_dict['s' + str(i)] = Vertex('s' + str(i))
        S.add_vertex(vertices_dict['s' + str(i)], samples[p][0]['s' + str(i)])

    edges = []
    for i in range(2, Ns + 1):
        edges.append('s' + str(1) + 's' + str(i))

    k = 1
    for i in range(2, Ns):
        if k % 5 != 0:
            edges.append('s' + str(i) + 's' + str(i + 1))
            k += 1
        else:
            k += 1
            continue

    for edge in edges:
        index = edge.find('s', 1)
        S.add_edge(edge[:index], edge[index:], samples[p][2][edge])  # Adding edges in the SERVERs graph

    #print('Sample number {}'.format(p))
    #print('The CPU capacity of each of the nodes in the server graph is {}'.format(S.CPU_S))
    #print('The server graph is defined by the adjacency Matrix as above:')
    #S.print_graph()


    def getAllPathsUtil(u, d, visited, path):
        # Mark the current node as visited and store in path
        visited[u - 1] = True
        path.append('s' + str(u))
        # If current vertex is same as destination, then add it
        if u == d:
            paths.append(str(path))
        else:
            # If current vertex is not destination
            # Recur for all the vertices adjacent to this vertex
            for i in S.graph[u]:
                if visited[i - 1] == False:
                    getAllPathsUtil(i, d, visited, path)
        # Remove current vertex from path[] and mark it as unvisited
        path.pop()
        visited[u - 1] = False


    def getAllPaths(u, v):
        s = int(u[1:])
        d = int(v[1:])
        # Mark all the vertices as not visited
        visited = [False] * (S.V)
        # Create an array to store paths
        path = []
        # Call the recursive helper function to print all paths
        getAllPathsUtil(s, d, visited, path)


    # Defining all paths starting from the source node to any destination node in the graph
    # This implementation respects the shortest path's reasoning
    L = []
    for i in range(1, Ns + 1):
        for j in range(i + 1, Ns + 1):
            if i != j:
                L.append('s' + str(i) + 's' + str(j))
    dict_paths = {}
    for key in L:
        List1 = []
        List2 = []
        paths = []
        index = key.find('s', 1)
        getAllPaths(key[:index], key[index:])
        paths = sorted(paths, key=len)
        for i in range(len(paths)):
            nodes = []
            pathway = paths[i]
            for j in range(len(pathway)):
                if (pathway[j] == 's') and (pathway[j + 2] == "'"):
                    nodes.append(pathway[j:j + 2])
                elif (pathway[j] == 's') and (pathway[j + 2] != "'"):
                    nodes.append(pathway[j:j + 3])
            List1.append(nodes)
            List2.append(nodes[::-1])
        dict_paths[key] = List1
        dict_paths[key[index:] + key[:index]] = List2


    # Defining the chain of the four virtual functions
    CPU_F = {}
    edges_F = {}
    sumbdw = {}
    for i in range(1):
        CPU = {}
        name = 'C1'
        CPU['f1'] = samples[p][1]['f1']
        CPU['f2'] = samples[p][1]['f2']
        CPU['f3'] = samples[p][1]['f3']
        CPU['f4'] = samples[p][1]['f4']
        CPU_F[name] = CPU
        bdw = []
        summ = 0
        for j in range(1, 4):
            L = [0, 0, 0, 0]
            a = samples[p][3]['f' + str(j) + 'f' + str(j + 1)]
            L[j] = a
            summ += a
            bdw.append(L)
        bdw.append([0, 0, 0, 0])
        edges_F[name] = bdw
        sumbdw[name] = summ
    #print(CPU_F)


    def updateList(Level, chain):
        L = []
        for key in S.CPU_S:
            if S.CPU_S[key] >= CPU_F[chain]['f' + str(Level)]:
                L.append(key)
        return L


    def nextVertices(Server, Level, List, chain):
        allowedVertices = []
        allowedPaths = []
        for key in List:
            if Server == key:
                allowedVertices.append(key)
            else:
                possiblePaths = dict_paths[Server + key]
                for i in range(len(possiblePaths)):
                    nodes = possiblePaths[i]
                    k = 0
                    while k < len(nodes) - 1:
                        if (edges_F[chain][Level - 2][Level - 1]) <= (
                                S.edges[int(nodes[k][1:]) - 1][int(nodes[k + 1][1:]) - 1]):
                            k += 1
                        else:
                            break
                    if k == len(nodes) - 1:
                        allowedPaths.append(nodes)
                        allowedVertices.append(key)
                        break
        return allowedVertices, allowedPaths


    def updateBdwMinus(nextServer, Level, Dict, chain):
        selectedPath = Dict[nextServer]
        k = 0
        while k < len(selectedPath) - 1:
            S.edges[int(selectedPath[k][1:]) - 1][int(selectedPath[k + 1][1:]) - 1] -= edges_F[chain][Level - 2][
                Level - 1]
            S.edges[int(selectedPath[k + 1][1:]) - 1][int(selectedPath[k][1:]) - 1] -= edges_F[chain][Level - 2][
                Level - 1]
            k += 1


    def updateBdwPlus(nextServer, Level, Dict, chain):
        selectedPath = Dict[nextServer]
        k = 0
        while k < len(selectedPath) - 1:
            S.edges[int(selectedPath[k][1:]) - 1][int(selectedPath[k + 1][1:]) - 1] += edges_F[chain][Level - 2][
                Level - 1]
            S.edges[int(selectedPath[k + 1][1:]) - 1][int(selectedPath[k][1:]) - 1] += edges_F[chain][Level - 2][
                Level - 1]
            k += 1


    # ### Defining the function bestPaths()
    def bestPaths(List, Level, Server, chain):
        myPath = {}
        myBdw = {}
        for key in List:
            allowedPaths = []
            Min = []
            if key == Server:
                # myBdw[key] = edges_F[chain][Level-2][Level-1]
                myBdw[key] = 0
            else:
                possiblePaths = dict_paths[Server + key]
                for i in range(len(possiblePaths)):
                    nodes = possiblePaths[i]
                    k = 0
                    minbdw = S.edges[int(nodes[k][1:]) - 1][int(nodes[k + 1][1:]) - 1]
                    while (k < len(nodes) - 1):
                        if (edges_F[chain][Level - 2][Level - 1]) <= (
                                S.edges[int(nodes[k][1:]) - 1][int(nodes[k + 1][1:]) - 1]):
                            if minbdw > S.edges[int(nodes[k][1:]) - 1][int(nodes[k + 1][1:]) - 1]:
                                minbdw = S.edges[int(nodes[k][1:]) - 1][int(nodes[k + 1][1:]) - 1]
                            k += 1
                        else:
                            break
                    if k == len(nodes) - 1:
                        allowedPaths.append(nodes)
                        Min.append(minbdw - edges_F[chain][Level - 2][Level - 1])
                myBdw[key] = max(Min)
                myPath[key] = allowedPaths[Min.index(max(Min))]
        return myBdw, myPath


    def bestSelection(List, Level, Dict, chain):
        bestNodes = []
        nodes_optim = {}
        if Dict == {}:
            for key in List:
                nodes_optim[key] = 0.5 * (S.CPU_S[key] - CPU_F[chain]['f' + str(Level)])
        else:
            for key in List:
                nodes_optim[key] = 0.5 * (S.CPU_S[key] - CPU_F[chain]['f' + str(Level)]) + 0.5 * Dict[key]
        sorted_dict = sorted(nodes_optim.items(), key=lambda kv: kv[1], reverse=True)
        sorted_dictionary = collections.OrderedDict(sorted_dict)
        for key in sorted_dictionary:
            bestNodes.append(key)
        return bestNodes


    # ### Defining the main function

    def main(chain):
        ourBestPath = []
        objectifFunction = 0
        L2 = [0] * 3
        L1 = bestSelection(updateList(1, chain), 1, {}, chain)
        try:
            best = L1[0]
        except IndexError:
            print('Network Overloaded, please wait or try it later!')
            time_Heuristic.append('None')
            obj_Heuristic.append('None')
            return 0
        best = L1[0]
        # Start Time
        start_time = time.perf_counter()
        for i in range(1, len(CPU_F[chain])):
            S.CPU_S[best] -= CPU_F[chain]['f' + str(i)]
            if (i > 1) and (ourBestPath[i - 2] != best):
                updateBdwMinus(best, i, L3[1], chain)
            L2[i - 1] = updateList(i + 1, chain)
            if len(nextVertices(best, i + 1, L2[i - 1], chain)[0]) > 0:
                # print(best)
                # print(nextVertices(best, i+1, L2[i-1], chain)[0])
                ourBestPath.append(best)
                if i > 1:
                    objectifFunction += L3[0][ourBestPath[i - 1]]
                L3 = bestPaths(nextVertices(best, i + 1, L2[i - 1], chain)[0], i + 1, best, chain)
                L1 = bestSelection(nextVertices(best, i + 1, L2[i - 1], chain)[0], i + 1, L3[0], chain)
                if len(L1) == 0:
                    print('Bandwidth problem, no link from {} was found'.format(best))
                    time_Heuristic.append('None')
                    obj_Heuristic.append('None')
                    return 0
                best = L1[0]
            else:
                k = 0
                while (k < len(L1) - 1):
                    S.CPU_S[best] += CPU_F[chain]['f' + str(i)]
                    if (i > 1) and (ourBestPath[i - 2] != best):
                        updateBdwPlus(best, i, L3[1], chain)
                    best = L1[k + 1]
                    if (i > 1) and (ourBestPath[i - 2] != best):
                        updateBdwMinus(best, i, L3[1], chain)
                    S.CPU_S[best] -= CPU_F[chain]['f' + str(i)]
                    L2[i - 1] = updateList(i + 1, chain)
                    if len(nextVertices(best, i + 1, L2[i - 1], chain)[0]) == 0:
                        k += 1
                    else:
                        break
                if k == len(L1) - 1:
                    print('Network Overloaded in {}, please wait or try it later!'.format(best))
                    time_Heuristic.append('None')
                    obj_Heuristic.append('None')
                    return 0
                elif k < len(L1) - 1:
                    ourBestPath.append(best)
                    if i > 1:
                        objectifFunction += L3[0][ourBestPath[i - 1]]
                    L3 = bestPaths(nextVertices(best, i + 1, L2[i - 1], chain)[0], i + 1, best, chain)
                    L1 = bestSelection(nextVertices(best, i + 1, L2[i - 1], chain)[0], i + 1, L3[0], chain)
                    if len(L1) == 0:
                        print('Bandwidth problem, no link from {} was found'.format(best))
                        time_Heuristic.append('None')
                        obj_Heuristic.append('None')
                        return 0
                    best = L1[0]

        S.CPU_S[best] -= CPU_F[chain]['f4']
        ourBestPath.append(best)
        time_Heuristic.append(round((time.perf_counter() - start_time) * 1000, 3))
        if ourBestPath[2] != ourBestPath[3]:
            updateBdwMinus(ourBestPath[3], 4, L3[1], chain)
        objectifFunction += L3[0][ourBestPath[3]]
        for key in list(dict.fromkeys(ourBestPath)):
            objectifFunction += S.CPU_S[key]
        obj_Heuristic.append(round(objectifFunction, 3))
        return ourBestPath



if __name__ == "__main__":
    sv = main('C1')
    print(sv)
    """ # updating the storage ("selector") of the RbPi that will execute f1
    w.put('/rbpi'+str(sv[0][1])+'/vnf', Value(str(1), encoding=Encoding.STRING))
    # updating the storages ("selectors") of the selected Pis, so they can know the next node that will execute the next function
    w.put('/rbpi' + str(sv[0][1]) + '/next', Value(str(sv[1][1])+str(sv[2][1])+str(sv[3][1]), encoding=Encoding.STRING))
    w.put('/rbpi' + str(sv[1][1]) + '/next', Value(str(sv[1][1])+str(sv[2][1])+str(sv[3][1]), encoding=Encoding.STRING))
    w.put('/rbpi' + str(sv[2][1]) + '/next', Value(str(sv[1][1])+str(sv[2][1])+str(sv[3][1]), encoding=Encoding.STRING)) """



