$(function() {
    let selectedCourse = "dethink";
    let course = {
        dethink: [
            {encounter: 1, isHidden: false, subject: "Pengantar Design Thinking"},
            {encounter: 2, isHidden: false, subject: "Filosofi, Prinsip & Tahapan Design Thingking"},
            {encounter: 3, isHidden: false, subject: "Inovasi"},
            {encounter: 4, isHidden: false, subject: "Tahapan Design Thingking"},
            {encounter: 5, isHidden: false, subject: "Personas"},
            {encounter: 6, isHidden: false, subject: "Emphatize"},
            {encounter: 7, isHidden: false, subject: "Emphaty Map"},
            {encounter: 8, isHidden: false, subject: "UTS & Define"},
            {encounter: 9, isHidden: false, subject: "Define & Idetaion / SCAMPER"},
            {encounter: 10, isHidden: false, subject: "Metode Pemilihan Ideation"},
            {encounter: 11, isHidden: false, subject: "Thingking Out of The box"},
            {encounter: 12, isHidden: false, subject: "Prototype"},
            {encounter: 13, isHidden: false, subject: "Test"},
            {encounter: 14, isHidden: false, subject: "Implement"},
            {encounter: 15, isHidden: false, subject: "Review Materi Pertemuan 2 - 14"},
            {encounter: 16, isHidden: false, subject: "UAS"},
        ]
    };

    $('.btn-find').on('click', function () {
        let searchVal = $('input[name="searching"]').val().toLowerCase();
        course[selectedCourse].forEach(function (vCourse, iCourse) {
            let searchResult = vCourse.subject.toLowerCase().match(searchVal);
            course[selectedCourse][iCourse].isHidden = searchResult === null;
        });

        console.log(course[selectedCourse]);
    });
});