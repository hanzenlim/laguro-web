import { lighten, darken } from 'polished';
import theme from '../components/theme';

export const getEquipmentColor = equipment => {
    switch (equipment) {
        case 'Digital Xray Sensors':
            return theme.colors.background.blue;
        case 'Lateral Ceph':
            return darken(0.1, theme.colors.background.blue);
        case 'Panoramic':
            return darken(0.2, theme.colors.background.blue);
        case 'CBCT':
            return lighten(0.1, theme.colors.background.blue);
        case 'Intraoral Camera':
            return lighten(0.2, theme.colors.background.blue);
        case 'Caries Detection Cameras':
            return theme.colors.background.yellow;
        case 'Cerec CAD/CAM':
            return darken(0.1, theme.colors.background.yellow);
        case 'Digital Scanner':
            return darken(0.2, theme.colors.background.yellow);
        case 'Endodontic Microscope':
            return theme.colors.background.orange;
        case 'Endo Rotary Instruments (Motor and New Files)':
            return darken(0.1, theme.colors.background.orange);
        case 'Periodontic Scalers':
            return darken(0.2, theme.colors.background.orange);
        case 'Cavitron/Piezo Unit and Tips':
            return lighten(0.1, theme.colors.background.orange);
        case 'Hard Tissue Laser':
            return '#6bd2b0';
        case 'Implant System':
            return lighten(0.1, '#6bd2b0');
        case 'Soft Tissue Laser':
            return darken(0.1, '#6bd2b0');
        case 'Implant System 2':
            return darken(0.2, '#6bd2b0');
        case 'Implant System 3':
            return '#f97171';
        case 'Nitrous Oxide':
            return lighten(0.1, '#f97171');
        case 'Composite set up':
            return darken(0.1, '#f97171');
        case 'Crown and bridge set up':
            return theme.colors.background.gray;
        case 'Removable set up':
            return darken(0.1, theme.colors.background.gray);
        case 'Extraction set up':
            return darken(0.2, theme.colors.background.gray);
        default:
            return theme.colors.background.blue;
    }
};
