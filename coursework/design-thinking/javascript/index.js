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

$(function() {
    loadSubject();

    $('.btn-find').on('click', function () {
        let searchVal = $('input[name="searching"]').val().toLowerCase();
        course[selectedCourse].forEach(function (vCourse, iCourse) {
            let searchResult = vCourse.subject.toLowerCase().match(searchVal);
            course[selectedCourse][iCourse].isHidden = searchResult === null;
        });

        loadSubject();
    });

    function loadSubject() {
        const elSubjectList = $('#subject-list-component');
        elSubjectList.html('');
        course[selectedCourse].forEach(function (vCourse, iCourse) {
            if (! vCourse.isHidden) {
                elSubjectList.append(`
                    <div class="px-5 pb-5">
                        <div class="collapse collapse-arrow border-t border-x border-blue-300">
                            <input type="checkbox" /> 
                            <div class="collapse-title text-sm sm:text-xl font-medium border-b border-blue-300">
                                Pertemuan - ${vCourse.encounter} | ${vCourse.subject}
                            </div>
                            <div class="collapse-content bg-base-100 border-b border-b-blue-300">
                                <div class="divider divider-info">Pembahasan</div>
                                <div class="mt-4">
                                    Salam Budi Luhur, pertemuan kali ini akan membahas mengenai:
                                    <ul class="list-disc ml-5">
                                        <li>Peraturan kelas yang akan disepakati.</li>
                                        <li>Gambaran tugas-tugas yang akan diberikan.</li>
                                        <li>Aturan bobot nilai dalam perkuliahan.</li>
                                        <li>Materi pengantar Design Thinking.</li>
                                    </ul><br/>
                                    Silakan ikuti langkah berikut sebelum memulai pembahasan pertemuan kali ini:
                                    <ul class="list-decimal ml-5">
                                        <li>Berdoa.</li>
                                        <li>Isi daftar kehadiran.</li>
                                        <li>Pelajari Materi yang disediakan.</li>
                                        <li>Mengikuti tatap muka kelas.</li>
                                        <li>Mengerjakan Quiz.</li>
                                        <li>Mengisi Umpan Balik.</li>
                                    </ul>
                                </div>
                                <div class="divider divider-info">Presensi</div>
                                <div class="mt-4">
                                    Kamis, 05/10/2023<br/>08:00 ~ 08:15 WIB<br/><br/>
                                    Status Presensi: 
                                    <div class="badge badge-success gap-2">
                                        HADIR
                                    </div>
                                </div>
                                <div class="divider divider-info">Dokumen Pendukung</div>
                                <ul class="list-disc ml-5">
                                    <li><a class="link link-base" href="sample/sample-pdf-1.pdf" target="_blank">Materi</a></li>
                                    <li><a class="link link-base" href="sample/sample-pdf-2.pdf" target="_blank">Presentasi</a></li>
                                    <li><a class="link link-base" href="sample/sample-pdf-3.pdf" target="_blank">Tugas - A</a></li>
                                    <li><a class="link link-base" href="sample/sample-pdf-4.pdf" target="_blank">Tugas - B</a></li>
                                    <li><a class="link link-base" href="sample/sample-pdf-5.pdf" target="_blank">Tugas - C</a></li>
                                </ul><br/>
                            </div>
                        </div>
                    </div>
                `);
            }
        });
    }
});