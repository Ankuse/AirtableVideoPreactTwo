export const airbase = {
    apiKey: "key9vUtCwtJJiUzrp",
    baseId: "appOB5mr27kviHhs1",
    maxRecords: 20,
    tables: [
        {
            id: 0,
            name: "Table%201",
            viewId: "Grid%20view"
        },
        {
            id: 1,
            name: "Table%202",
            viewId: "Grid%20view"
        },
        /*{
            id: 2,
            name: "Table%203",
            viewId: "Grid%20view"
        }*/
    ],
};


export const methods ={
    getAirtablesId(tables){
        return tables.map((table) => {
            return table.id;
        })
    }
};