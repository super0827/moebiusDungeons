import { store } from '../../store/store'
import { mapState } from 'vuex';

export default {
    computed: mapState([
        'isEntering',
        'phase',
        'music',
        'player',
        'helper'
    ])
};
