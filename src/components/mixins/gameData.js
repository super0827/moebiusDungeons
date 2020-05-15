import { mapState } from 'vuex';

export default {
    computed: mapState([
        'isEntering',
        'helper',
        'phase',
        'music',
        'player',
        'monster',
        'playerLog',
        'monsterLog',
        'monsterRoster',
    ])
};
