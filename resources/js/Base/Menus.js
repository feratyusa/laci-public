const MainMenu = [
        {name: 'Dashboard', link: 'dashboard', url: 'home'},
        {name: 'Usulan', link: 'proposal.index', url: 'proposals'},
        {name: 'Event', link: 'event.index', url: 'events'},
        {name: 'Kalkulator', link: 'calculator.index', url: 'calculator'},
        {name: 'Kalender', link: 'calendar.index', url: 'calendar'},
        {name: 'Master', link: [
            // {name: 'User', link: 'dashboard', url: 'master/user'},
            {name: 'Kategori File', link: 'category.index', url: 'master/categories'},
            {name: 'Kategori Wajib', link: 'mandatory-category.index', url: 'master/mandatory-categories'},
            {name: 'Anggaran', link: 'budget.index', url: 'master/budgets'},
        ], url: 'master'},
        {name: 'Tutorial', link: 'dashboard', url: 'tutorial'},
    ]

const ProfileMenu = [
        {name: 'Profile', link: 'profile.edit', url:'profile'},
        // {name: 'Settings', link: 'dashboard', url:'settings'},
        {name: 'Logout', link: 'logout', url:'logout', method: 'post'}
    ]

export { MainMenu, ProfileMenu }