import { updateArray } from 'cx/data';
import { DELETE, POST } from '../../common/api/util/methods';
import { editStatus } from '../overlays/editStatus';
import { showErrorToast } from '../util/toasts';

export const StatusesController = {
   async onEditStatus(e, { store }) {
      let status = store.get('$record');
      let { success, data } = await editStatus(status);
      if (success) this.replaceStatus(data);
   },

   async onDeleteStatus(e, { store }) {
      let status = store.get('$record');
      try {
         await DELETE(`statuses/${status.id}`);
         this.store.update('$page.data', (data) => data.filter((s) => s.id != status.id));
      } catch (err) {
         showErrorToast(err, 'Failed to delete status');
      }
   },

   async onToggleLike(e, { store }) {
      let { id, liked } = store.get('$record');
      let method = !liked ? POST : DELETE;
      let status = await method(`statuses/${id}/like`);
      this.replaceStatus(status);
   },

   async onToggleStar(e, { store }) {
      let { id, starred } = store.get('$record');
      let method = !starred ? POST : DELETE;
      let status = await method(`statuses/${id}/topic/star`);
      this.replaceStatus(status);
      this.store.update(
         '$page.data',
         updateArray,
         (x) => ({
            ...x,
            starred: status.starred,
         }),
         (x) => x.topicId == status.topicId
      );
   },

   replaceStatus(status) {
      this.store.update(
         '$page.data',
         updateArray,
         (x) => status,
         (x) => x.id == status.id
      );
   },
};
