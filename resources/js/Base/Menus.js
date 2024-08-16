const MainMenu = [
        {name: 'Dashboard', link: 'dashboard', icon: 'home'},
        {name: 'Usulan', link: 'proposal.index', icon: 'proposal'},
        {name: 'Event', link: 'event.index', icon: 'event'},
        {name: 'Kalender', link: 'calendar.index', icon: 'calendar'},
        {name: 'Kalkulator', link: 'calculator.index', icon: 'calculator'},
        {name: 'Tutorial', link: 'dashboard', icon: 'tutorial'}
    ]

const ProfileMenu = [
        {name: 'Profile', link: 'profile.edit', icon:'profile'},
        {name: 'Settings', link: 'dashboard', icon:'settings'},
        {name: 'Logout', link: 'logout', icon:'logout', method: 'post'}
    ]

export { MainMenu, ProfileMenu }