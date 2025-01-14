const MainMenu = [
        {name: 'Dashboard', link: 'dashboard', url: 'home'},
        {name: 'Report Pendidikan', link: [
            {name: 'Nugie', link: 'nugie.index', url: 'utilities/nugies'},
            {name: 'Report Pendidikan Reload', link: 'reportReload.index', url: 'utilities/reportReload'},
        ], url: 'utilities'},
        {name: 'Usulan', link: 'proposal.index', url: 'proposals'},
        {name: 'Event', link: 'event.index', url: 'events'},
        {name: 'Kalkulator', link: 'calculator.index', url: 'calculator'},
        {name: 'Kalender', link: 'calendar.index', url: 'calendar'},
        {name: 'Master', link: [
            {name: 'User', link: 'users.index', url: 'master/user'},
            {name: 'Kategori File', link: 'category.index', url: 'master/categories'},
            {name: 'Kategori Wajib', link: 'mandatory-category.index', url: 'master/mandatory-categories'},
            {name: 'Anggaran', link: 'budget.index', url: 'master/budgets'},
            {name: 'Lokasi', link: 'location.index', url: 'master/locations'},
            {name: 'Sertifikasi', link: 'sertifikasi.index', url: 'master/sertifikasi'},
            {name: 'Jenis Kursus', link: 'kursus.index', url: 'master/kursus'},
            {name: 'Lembaga', link: 'lembaga.index', url: 'master/lembaga'},
        ], url: 'master'},
        {name: 'Change Log', link: 'changeLog.index', url: 'changelog'},
        {name: 'Panduan', link: 'tutorial.index', url: 'tutorial'},
    ]

const ProfileMenu = [
        // {name: 'Profile', link: 'profile.edit', url:'profile'},
        {name: 'Logout', link: 'logout', url:'logout', method: 'post'}
    ]

export { MainMenu, ProfileMenu }
