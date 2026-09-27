window.onload = function () {

    let nodes = new vis.DataSet([]);
    let edges = new vis.DataSet([]);
    let paperTitles = {};

    let container = document.getElementById("network");
    let data = { nodes: nodes, edges: edges };
    let options = { edges: { arrows: "to" } };
    new vis.Network(container, data, options);

    window.addPaper = function () {
        let id = document.getElementById("paperId").value;
        let title = document.getElementById("title").value;
        let cites = document.getElementById("cites").value;

        if (!id || !title) {
            alert("Enter Paper ID and Title");
            return;
        }

        addToGraph(id, title, "Manual", cites);
    };

    window.loadExcel = function (event) {
        let file = event.target.files[0];
        let reader = new FileReader();

        reader.onload = function (e) {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, { type: "array" });
            let sheet = workbook.Sheets[workbook.SheetNames[0]];
            let rows = XLSX.utils.sheet_to_json(sheet);

            rows.forEach(row => {
                addToGraph(
                    row["PaperID"],
                    row["Title"],
                    row["Author"],
                    row["Cites"]
                );
            });
        };

        reader.readAsArrayBuffer(file);
    };

    function addToGraph(id, title, author, cites) {
        if (!id) return;

        let cleanTitle = (title || "").toLowerCase().trim();
        let isDuplicate = false;

        if (paperTitles[cleanTitle]) {
            isDuplicate = true;
        } else {
            paperTitles[cleanTitle] = id;
        }

        let nodeColor = isDuplicate ? "red" : "#1fa2ff";

        if (!nodes.get(id)) {
            nodes.add({
                id: id,
                label: id,
                title: "Title: " + title + "\nAuthor: " + author,
                color: nodeColor
            });
        }

        if (isDuplicate) {
            let oldId = paperTitles[cleanTitle];
            if (nodes.get(oldId)) {
                nodes.update({ id: oldId, color: "red" });
            }
        }

        if (cites) {
            cites.toString().split(",").forEach(c => {
                let target = c.trim();
                if (!nodes.get(target)) {
                    nodes.add({ id: target, label: target });
                }
                edges.add({ from: id, to: target });
            });
        }
    }
};