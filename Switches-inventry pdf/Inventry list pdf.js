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
        ["5Ams 1Way Switch", fetchValue("5ams-switch")],
        ["5Ams 2-Way Switch", fetchValue("5ams-2wayswitch")],
        ["Bell Switch", fetchValue("Bell")],
        ["5Ams Socket", fetchValue("5ams-socket")],
        ["15Ams Switch with Indicator", fetchValue("15ams-switch")],
        ["15Ams Socket", fetchValue("15ams-socket")],
        ["Dimmer step 1M", fetchValue("dimmer-1m")],
        ["Dimmer step 2M", fetchValue("dimmer-2m")],
        ["20-Ams SwitchType MCB", fetchValue("ac-mcb")],
        ["25Ams Socket", fetchValue("25ams-socket")],
        ["Switch Dummy", fetchValue("switch-dummy")],
        ["18M Plate", fetchValue("18mplate")],
        ["16M Plate", fetchValue("16mplate")],
        ["12M Plate", fetchValue("12mplate")],
        ["9M Plate", fetchValue("09mplate")],
        ["8M Plate", fetchValue("08mplate")],
        ["6M Plate", fetchValue("06mplate")],
        ["4M Plate", fetchValue("04mplate")],
        ["3M Plate", fetchValue("03mplate")],
        ["2M Plate", fetchValue("02mplate")],
        ["1M Plate", fetchValue("01mplate")],
        ["40Ams 4pole Isolator", fetchValue("40ams-isolator")],
        ["40Ams 2Pole Isolator", fetchValue("40ams-2pisolator")],
        ["63Ams Isolator", fetchValue("63Ams-Isolator")],
        ["63Ams Rotary", fetchValue("63Rotary-switches")],
        ["40Ams Rotary Switch", fetchValue("40Rotary-switches")],
        ["RYB Indicator (Round Type)", fetchValue("RYB-Indicator")],
        ["32Ams Single pole MCB", fetchValue("Single32Ams")],
        ["20Ams Single pole MCB", fetchValue("Single20Ams")],
        ["16Ams Single pole MCB", fetchValue("Single16Ams")],
        ["10Ams Single pole MCB", fetchValue("Single10Ams")],
        ["06Ams Single pole MCB", fetchValue("Single06Ams")],
        ["Tape", fetchValue("Tape")],
        ["Angle Holder", fetchValue("Angle-Holder")],
        ["Button Holder", fetchValue("Button-Holder")],
        ["Ceiling Rose", fetchValue("Ceiling-Rose")],
        ["Round Plate", fetchValue("Round-Plates")],
        ["Fan Plate", fetchValue("Fan-Plate")],
        ["15x6 PVC Dummy", fetchValue("15*6sheet")],
        ["15x4 PVC Dummy", fetchValue("15*4sheet")],
        ["12x6 PVC Dummy", fetchValue("12*6sheet")],
        ["12x4 PVC Dummy", fetchValue("12*4sheet")],
        ["10x6 PVC Dummy", fetchValue("10*6sheet")],
        ["10x4 PVC Dummy", fetchValue("10*4sheet")],
        ["12M PVC Dummy", fetchValue("12M-sheet")],
        ["6M PVC Dummy", fetchValue("6M-sheet")],
        ["4M PVC Dummy", fetchValue("4M-sheet")],
        ["3M PVC Dummy", fetchValue("3M-sheet")],
        ["2M PVC Dummy", fetchValue("2M-sheet")],
        ['3/4" Star Screw', fetchValue("3/4SS")],
        ['1" Star Screw', fetchValue("1SS")],
        ['1"-1/4" Star Screw', fetchValue("1-1/4SS")],
        ['1"-1/2" Star Screw', fetchValue("1-1/2SS")],
        ['2" Star Screw', fetchValue("2SS")],
        ['2"-1/2" Star Screw', fetchValue("2-1/2SS")],
        ['2"-1/2"x8 Star Screw', fetchValue("2-1/2*8")],
        ['3" Star Screw', fetchValue("3SS")],
        ['20 Watts TubeLight', fetchValue("tubelight")],
        ['6W Spot Light (White)', fetchValue("6spotlight")],
        ['6W Spot Light (Warm White)', fetchValue("6spotlightww")],
        ['BulkHead(Inventa)', fetchValue("bulkhead")],
        ['Bell', fetchValue("bell")],
        ['15W Surface Fitting(round)', fetchValue("15surface")],
        ['9W LED Light', fetchValue("9ledlight")],

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
