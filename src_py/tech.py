import json

datadir = '../data/'
inpath = 'techs.in'
outpath = 'techs.json'

json_dump = {}
with open(datadir + inpath) as f:
    header = ['Name','Internal',' Desc', 'Parent','cost','hidden_pg','present_pg']
    nodes = []
    links = []
    for line in f:
        tmp = {}
        term = line.strip().split('\t')
        tmp['id'] = int(term[0])
        tmp['label'] = term[1]
        tmp['title'] = term[2] + ' (' + term[4] + 'p)'
        
        rel = {}
        if term[3] != '-':
            rel['from'] = int(term[3])
            rel['to'] = int(term[0])
            links.append(rel)
        
        tmp['cost'] = int(term[4])

        try:
            if term[5] != '' :
                tmp['hidden_pg'] = term[5]
        except:
            pass
        nodes.append(tmp)
        
        

    json_dump['nodes'] = nodes
    json_dump['edges'] = links
    print(json_dump)

with open(datadir + outpath, 'w') as f:
    f.write(json.dumps(json_dump, indent=2))