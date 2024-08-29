const MainMenu = [
        {name: 'Dashboard', link: 'dashboard', url: 'home'},
        {name: 'Usulan', link: 'proposal.index', url: 'proposals'},
        {name: 'Event', link: 'event.index', url: 'events'},
        {name: 'Kalender', link: 'calendar.index', url: 'calendar'},
        {name: 'Kalkulator', link: 'calculator.index', url: 'calculator'},
        {name: 'Master', link: [
            {name: 'User', link: 'dashboard', url: 'master/user'},
            {name: 'File Kategori', link: 'category.index', url: 'master/categories'},
            {name: 'Mandatory Kategori', link: 'mandatory-category.index', url: 'master/mandatory-category'},
        ], url: 'master'},
        {name: 'Tutorial', link: 'dashboard', url: 'tutorial'},
    ]

const ProfileMenu = [
        {name: 'Profile', link: 'profile.edit', url:'profile'},
        {name: 'Settings', link: 'dashboard', url:'settings'},
        {name: 'Logout', link: 'logout', url:'logout', method: 'post'}
    ]

export { MainMenu, ProfileMenu }