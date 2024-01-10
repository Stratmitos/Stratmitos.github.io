const PRESENCE_ALPHA = 0;
const PRESENCE_PRESENT = 1;
const PRESENCE_ILLNESS = 2;
const PRESENCE_UNABLE_ATTEND = 3;
const PRESENCE_EMPTY = 4;
const PRESENCE_LOCKED = 5;

let selectedCourse = "dethink";
let filterEncounterStartVal = 0;
let filterEncounterEndVal = 0;
let course = {
    dethink: [
        {encounter: 1, isHidden: false, presence: PRESENCE_PRESENT, date: "Kamis, 05/10/2023", time: "08:00 ~ 08:15 WIB", subject: "Pengantar Design Thinking"},
        {encounter: 2, isHidden: false, presence: PRESENCE_ALPHA, date: "Kamis, 12/10/2023", time: "08:00 ~ 08:15 WIB", subject: "Filosofi, Prinsip & Tahapan Design Thingking"},
        {encounter: 3, isHidden: false, presence: PRESENCE_EMPTY, date: "Rabu, 18/10/2023", time: "08:00 ~ 08:15 WIB", subject: "Inovasi"},
        {encounter: 4, isHidden: false, presence: PRESENCE_LOCKED, date: "Kamis, 19/10/2023", time: "08:00 ~ 08:15 WIB", subject: "Tahapan Design Thingking"},
        {encounter: 5, isHidden: false, presence: PRESENCE_LOCKED, date: "Kamis, 26/10/2023", time: "08:00 ~ 08:15 WIB", subject: "Personas"},
        {encounter: 6, isHidden: false, presence: PRESENCE_LOCKED, date: "Kamis, 02/11/2023", time: "08:00 ~ 08:15 WIB", subject: "Emphatize"},
        {encounter: 7, isHidden: false, presence: PRESENCE_LOCKED, date: "Kamis, 09/11/2023", time: "08:00 ~ 08:15 WIB", subject: "Emphaty Map"},
        {encounter: 8, isHidden: false, presence: PRESENCE_LOCKED, date: "Kamis, 16/11/2023", time: "08:00 ~ 08:15 WIB", subject: "UTS & Define"},
        {encounter: 9, isHidden: false, presence: PRESENCE_LOCKED, date: "Rabu, 22/11/2023", time: "08:00 ~ 08:15 WIB", subject: "Define & Idetaion / SCAMPER"},
        {encounter: 10, isHidden: false, presence: PRESENCE_LOCKED, date: "Kamis, 23/10/2023", time: "08:00 ~ 08:15 WIB", subject: "Metode Pemilihan Ideation"},
        {encounter: 11, isHidden: false, presence: PRESENCE_LOCKED, date: "Kamis, 30/11/2023", time: "08:00 ~ 08:15 WIB", subject: "Thingking Out of The box"},
        {encounter: 12, isHidden: false, presence: PRESENCE_LOCKED, date: "Rabu, 06/12/2023", time: "08:00 ~ 08:15 WIB", subject: "Prototype"},
        {encounter: 13, isHidden: false, presence: PRESENCE_LOCKED, date: "Kamis, 07/12/2023", time: "08:00 ~ 08:15 WIB", subject: "Test"},
        {encounter: 14, isHidden: false, presence: PRESENCE_LOCKED, date: "Kamis, 14/12/2023", time: "08:00 ~ 08:15 WIB", subject: "Implement"},
        {encounter: 15, isHidden: false, presence: PRESENCE_LOCKED, date: "Kamis, 04/01/2024", time: "08:00 ~ 08:15 WIB", subject: "Review Materi Pertemuan 2 - 14"},
        {encounter: 16, isHidden: false, presence: PRESENCE_LOCKED, date: "Kamis, 11/01/2024", time: "08:00 ~ 08:15 WIB", subject: "UAS"},
    ]
};

$(function() {
    const elSubjectList = $('#subject-list-component');
    const elSubjectLoading = $('#subject-list-loading');
    const elSubjectNotFound = $('#subject-list-not-found');
    const elSearching = $('input[name="searching"]');
    const elBtnSearching = $('#btn-find');
    const elBtnOpenModalFilter = $('#btn-open-filter');
    const elFilterEncounterStart = $('input[name="filter-by-encounter-start"]');
    const elFilterEncounterEnd = $('input[name="filter-by-encounter-end"]');
    const elBtnModalFilter = $('#btn-filter');
    const elBtnResetFilter = $('#btn-reset-filter');
    loadSubject();

    $(elBtnSearching).on('click', function () {
        let searchVal = elSearching.val().toLowerCase();
        let isHiddenVal = true;
        let totalHidden = 0;
        course[selectedCourse].forEach(function (vCourse, iCourse) {
            let searchResult = vCourse.subject.toLowerCase().match(searchVal);
            if (filterEncounterStartVal == 0 && filterEncounterEndVal == 0) {
                isHiddenVal = searchResult === null;
            } else if (vCourse.encounter >= filterEncounterStartVal && vCourse.encounter <= filterEncounterEndVal) {
                isHiddenVal = searchResult === null;
            } else {
                isHiddenVal = true;
            }

            course[selectedCourse][iCourse].isHidden = isHiddenVal;
            if (isHiddenVal == true) {
                totalHidden ++;
            }
        });

        $(elBtnSearching).prop('disabled', true);
        $(elBtnOpenModalFilter).prop('disabled', true);
        $(elSubjectList).hide();
        elSubjectNotFound.hide();
        $(elSubjectLoading).show();
        loadSubject();
        setTimeout(function() {
            $(elBtnSearching).prop('disabled', false);
            $(elBtnOpenModalFilter).prop('disabled', false);
            $(elSubjectLoading).hide();

            if (totalHidden == getLatestIndexCourse()) {
                elSubjectNotFound.show();
            } else {
                $(elSubjectList).show();
            }
        }, 1750);
    });

    $(elBtnModalFilter).on('click', function () {
        filterEncounterStartVal = parseInt(elFilterEncounterStart.val());
        filterEncounterEndVal = parseInt(elFilterEncounterEnd.val());

        filterEncounterStartVal = isNaN(filterEncounterStartVal) ? 0 : filterEncounterStartVal;
        filterEncounterEndVal = isNaN(filterEncounterEndVal) ? 0 : filterEncounterEndVal;

        if (filterEncounterStartVal != 0 && filterEncounterEndVal == 0) {
            let latestIndexCourse = getLatestIndexCourse() - 1;
            filterEncounterEndVal = course[selectedCourse][latestIndexCourse].encounter;
        } else if (filterEncounterStartVal == 0 && filterEncounterEndVal != 0) {
            filterEncounterStartVal = 0;
        }

        elBtnSearching.trigger("click");
    });

    $(elBtnResetFilter).on('click', function () {
        filterEncounterStartVal = 0;
        filterEncounterEndVal = 0;
        elFilterEncounterStart.val("");
        elFilterEncounterEnd.val("");
        elSearching.val("");

        elBtnSearching.trigger("click");
    });

    function loadSubject() {
        elSubjectList.html('');
        course[selectedCourse].forEach(function (vCourse) {
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
                                    ${vCourse.date}<br/>${vCourse.time}<br/><br/>
                                    ${showStatusPresence(vCourse.presence)}
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

    function getLatestIndexCourse() {
        return course[selectedCourse].length;
    }

    function showStatusPresence(vPresence) {
        let statusPresence = "HADIR";
        let colorPresence = "badge-success";

        if (vPresence == PRESENCE_ALPHA) {
            statusPresence = "TIDAK HADIR";
            colorPresence = "badge-error";
        } else if (vPresence == PRESENCE_ILLNESS) {
            statusPresence = "SAKIT";
            colorPresence = "badge-danger";
        } else if (vPresence == PRESENCE_UNABLE_ATTEND) {
            statusPresence = "IZIN";
            colorPresence = "badge-danger";
        } else if (vPresence == PRESENCE_EMPTY) {
            statusPresence = "Belum Mengisi Presensi";
            colorPresence = "badge-info";
        } else if (vPresence == PRESENCE_LOCKED) {
            statusPresence = "Presensi belum dibuka.";
            colorPresence = "badge-secondary";
        }

        return `
            Status Presensi: 
            <div class="badge ${colorPresence} gap-2">
                ${statusPresence}
            </div>
        `;
    }
});