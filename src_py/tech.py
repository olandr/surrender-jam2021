import json

datadir = '../data/'
inpath = 'techs.in'
outpath = 'techs.json'

json_dump = {}
with open(datadir + inpath) as f:
    nodes = []
    links = []
    for line in f:
        tmp = {}
        term = line.strip().split('\t')
        tmp['id'] = int(term[0])
        tmp['name'] = term[1]
        tmp['_indesc'] = term[2]
        if len(term) > 4:
            tmp['hidden_pg'] = term[4]
        nodes.append(tmp)
        
        tmp = {}
        if len(term) > 3:
            tmp['source'] = int(term[3])
            tmp['target'] = int(term[0])
            links.append(tmp)
        

    json_dump['nodes'] = nodes
    json_dump['links'] = links
    print(json_dump)

with open(datadir + outpath, 'w') as f:
    f.write(json.dumps(json_dump, indent=2))