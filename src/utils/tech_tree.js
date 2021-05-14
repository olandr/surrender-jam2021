import data from '../../data/techs';

export const generateTree = () => {
    // graph payload (with minimalist structure)
    console.log(data);
    console.log( {
        nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
        links: [
        { source: "Harry", target: "Sally" },
        { source: "Harry", target: "Alice" },
        ],
    });
    return data;
}
