let currentType = "url";

let statistics = {
    scans: 0,
    threats: 0,
    domains: 0
};


function selectType(type) {

    currentType = type;

    const input = document.getElementById("targetInput");

    const placeholders = {

        url: "https://example.com",

        domain: "example.com",

        ip: "8.8.8.8",

        hash: "SHA256 / SHA1 / MD5 hash",

        email: "authorized@email.com",

        phone: "+92XXXXXXXXXX"

    };

    input.placeholder = placeholders[type];

    input.focus();
}


function startScan() {

    const input =
        document.getElementById("targetInput");

    const target = input.value.trim();

    if (!target) {

        alert("Enter an indicator first.");

        return;
    }


    statistics.scans++;

    if (currentType === "domain") {
        statistics.domains++;
    }


    document
        .getElementById("scanCount")
        .textContent = statistics.scans;


    document
        .getElementById("domainCount")
        .textContent = statistics.domains;


    document
        .getElementById("results")
        .classList.remove("hidden");


    document
        .getElementById("resultTarget")
        .textContent = target;


    document
        .getElementById("resultType")
        .textContent =
            currentType.toUpperCase();


    document
        .getElementById("resultStatus")
        .textContent = "Ready for backend";


    document
        .getElementById("resultReputation")
        .textContent = "API integration required";


    window.location.hash = "scanner";
}


function openModule(type) {

    selectType(type);

    document
        .getElementById("scanner")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function generateReport() {

    const report = {

        platform: "Security V5.0",

        generated:
            new Date().toISOString(),

        scans:
            statistics.scans,

        domains:
            statistics.domains,

        note:
            "Connect backend intelligence providers for live findings."

    };


    const blob =
        new Blob(
            [JSON.stringify(report, null, 2)],
            { type: "application/json" }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "security-report.json";

    link.click();

    URL.revokeObjectURL(url);
}


function scrollToSection(id) {

    document
        .getElementById(id)
        .scrollIntoView({
            behavior: "smooth"
        });
}
