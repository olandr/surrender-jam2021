export const generateTree = () => {
    // graph payload (with minimalist structure)
    return {
        nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
        links: [
        { source: "Harry", target: "Sally" },
        { source: "Harry", target: "Alice" },
        ],
    };
}