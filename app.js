function loadImage(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const res = event.target.result;
                resolve(res);
            }
            const file = this.response;
            reader.readAsDataURL(file);
        }
        xhr.send();
    });
}

let signaturePad = null;

window.addEventListener('load', async () => {

    const canvas = document.querySelector("canvas");
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;

    signaturePad = new SignaturePad(canvas, {});

    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let curso = document.getElementById('curso').value;
        let nombre = document.getElementById('nombre').value;
        let codigo = document.getElementById('codigo').value;
        let cursoc = document.getElementById('cursoc').value;
        let numeroHijos = document.getElementById('numeroHijos').value;
        

        generatePDF(curso, nombre, codigo, cursoc, numeroHijos);
    })

});

async function generatePDF(curso, nombre, codigo, cursoc,numeroHijos) {
    const image = await loadImage("SOLICITUD DE RETIRO DE CURSOS(1)_page-0001.jpg");
    const signatureImage = signaturePad.toDataURL();

    const pdf = new jsPDF('p', 'pt', 'letter');

    pdf.addImage(image, 'PNG', 0, 0, 565, 792);
    pdf.addImage(signatureImage, 'PNG', 200, 370, 300, 60);

    pdf.setFontSize(12);
    

    const date = new Date();
    var day = date.getUTCDate().toString().padStart(2, '0');
    var month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    var year = date.getUTCFullYear().toString();

    // Agregar guiones a los lados de la fecha
    var formattedDate = '' + day + '/' + month + '/' + year + '';

    pdf.text(formattedDate, 275, 135);
     

    pdf.setFontSize(10);
    pdf.text(nombre, 260, 105);
    pdf.text(curso, 260, 75);
    pdf.text(codigo, 275, 90);
    pdf.text(cursoc, 170, 202);

    

    pdf.setFillColor(0,0,0);

    if (parseInt(numeroHijos) === 1) {
        pdf.circle(358, 202, 4, 'FD');
    } else if (parseInt(numeroHijos) === 2) {
        pdf.circle(385, 202, 4, 'FD');
    } else if (parseInt(numeroHijos) === 3) {
        pdf.circle(400, 202, 4, 'FD');
    } else if (parseInt(numeroHijos) === 4) {
        pdf.circle(425, 202, 4, 'FD');
    } else if (parseInt(numeroHijos) === 5) {
        pdf.circle(443, 202, 4, 'FD');
    } else if (parseInt(numeroHijos) === 6) {
        pdf.circle(458, 202, 4, 'FD');
    } else if (parseInt(numeroHijos) === 7) {
        pdf.circle(478, 202, 4, 'FD');
    }
    



    pdf.save("Solicitud de retiro de curso.pdf");

}