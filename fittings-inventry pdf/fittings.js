function mainpdfgenerate() {
    // Check if jsPDF is available
    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert("jsPDF library not loaded. Please include the jsPDF and autoTable libraries.");
        return;
    }

    // Function to fetch values safely
    const fetchValue = (id) => {
        const element = document.getElementById(id);
        return element ? element.value.trim() || "N/A" : "N/A"; // Handle missing inputs gracefully
    };

    // Collect input values
    let inputData = [
        ["Builders", fetchValue("builders")],
        ['20 Watts TubeLight', fetchValue("tubelight")],
        ['6W Spot Light', fetchValue("6nomension")],
        ['6W Spot Light (White)', fetchValue("6spotlight")],
        ['6W Spot Light (Warm White)', fetchValue("6spotlightww")],
        ['3 Watts Junction Box LED Spot', fetchValue("3w-J-boxspot")],
        ['3 Watts Junction Box LED Spot(White)', fetchValue("3w-w-J-boxspot")],
        ['3 Watts Junction Box LED Spot(Warm White)', fetchValue("3w-ww-J-boxspot")],
        ['BulkHead(Inventa)', fetchValue("bulkhead")],
        ['Up-DownLight', fetchValue("updownlight")],
        ['Bell', fetchValue("bell")],
        ['Ropelight', fetchValue("ropelight")],
        ['Ropelight (adaptor or connection pin)', fetchValue("adaptor")],
        ['Ropelight-Dc', fetchValue("ropelight-dc")],
        ['SMPS-Adaptor', fetchValue("SMPS")],
        ['15W Surface Fitting(round)', fetchValue("15surface")],
        ['9W LED Light', fetchValue("9ledlight")],
        ['40Ams-4pole-RCCB 30ma', fetchValue("40ams-rccb")],
        ['4Way-MCB-Box', fetchValue("4way-Box")],
        ['32Ams-Fuse', fetchValue("32amsfuse")],
        ['3/16x1"1/2 Boldnut-Washer', fetchValue("3/16*1'1/2boldnut")],
        ['7/18 Aluminium CTS Wire', fetchValue("7/18alu")],
        ['14Kg-Copper', fetchValue("14kg-copper")],
        ['18Kg-Copper', fetchValue("18kg-copper")],
        ['Reel(Porcelain Ceramic)', fetchValue("Reel")],
        ["Tape(Deer-Brand)", fetchValue("Tape")],
        ['1"GI-Pipe(Heavy)', fetchValue("1'gi-pipe")],
        ['8Kg-Copper(Earth)', fetchValue("8kg-copper")],
        ['3"x1/4 Boldnut-Washer', fetchValue("3*1/4boldnut")],
        ['RG6-TV-Cable', fetchValue("rg6tv-cable")],
        ['Cat6 Internet Cable', fetchValue("cat6-camera")],
        ['', fetchValue("")],
        ['', fetchValue("")],
        ['', fetchValue("")],
        ['', fetchValue("")],
        ['', fetchValue("")],
        ['', fetchValue("")],
        ['', fetchValue("")],
        ['', fetchValue("")],
        ['', fetchValue("")],
        ['', fetchValue("")],
        ['', fetchValue("")],


    ];

    // Count all non-empty inputs (including "Builders")
    // Count all non-empty inputs **EXCEPT "Builders"**
    let totalInputs = inputData.filter(entry => entry[1] !== "N/A" && entry[0] !== "Builders").length;

    // Prepare data for the PDF (Include "Builders", but exclude it from total count)
    let filteredData = inputData.filter(entry => entry[1] !== "N/A");


    // Initialize jsPDF
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    // Get current date and time
    let now = new Date();
    let currentDateTime = now.toLocaleString();

    // Add title and metadata
    doc.setFontSize(16);
    doc.text("Prakash Electricians", 105, 20, { align: "center" });
    doc.setFontSize(14);
    doc.text("Fittings", 104, 30, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Date & Time: ${currentDateTime}`, 20, 40);
    doc.text(`Total Number Of Items: ${totalInputs}`, 20, 50);

    // Ensure autoTable is available
    if (!doc.autoTable) {
        alert("AutoTable plugin not loaded. Please include the autoTable library.");
        return;
    }

    // Generate the table using filtered data
    doc.autoTable({
        head: [["Field", "Value"]],
        body: filteredData,
        startY: 60,  // Shift table down slightly
    });

    // Save and print the PDF
    let fileName = `Invoice_${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}${now.getMinutes()}.pdf`;
    doc.save(fileName);
    window.open(doc.output('bloburl'));  // Open the PDF for preview/printing
}





    // Count all non-empty inputs **EXCEPT "Builders"**
    let totalInputs = inputData.filter(entry => entry[1] !== "N/A" && entry[0] !== "Builders").length;

    // Prepare data for the PDF (Include "Builders", but exclude it from total count)
    let filteredData = inputData.filter(entry => entry[1] !== "N/A");

    doc.text(`Total Inputs (Excluding 'Builders'): ${totalInputs}`, 20, 50);
