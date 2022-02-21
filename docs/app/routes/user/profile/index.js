import { LabelsLeftLayout, Rescope } from 'cx/ui';
import { Button, TextField, UploadButton } from 'cx/widgets';
import { AsyncButton } from '../../../components/AsyncButton';

function onUploadStarting(xhr, instance, file) {
    if (file.type.indexOf('image/') != 0) {
        MsgBox.alert('Selected file is not an image file.');
        return false;
    }

    if (file.size > 5e6) {
        MsgBox.alert('Selected file is too large. The file should be smaller than 5 MB.');
        return false;
    }

    //xhr.setRequestHeader('name', 'value');
}

function onUploadComplete(xhr, { store }) {
    if (xhr.status != 200) {
        MsgBox.alert(`Upload failed. Status ${xhr.status}.`);
        return;
    }
    var { picture_url } = JSON.parse(xhr.responseText);
    store.set('user.picture_url', picture_url);
}

export default (
    <cx>
        <main class="min-h-full bg-gray-200 mt-16 py-3">
            <div class="container bg-white shadow rounded-lg px-6 pt-4 pb-8">
                <div class="flex">
                    <div>
                        <div class="mb-4 text-gray-800 font-semibold">User Profile</div>
                        <LabelsLeftLayout labelClass="w-24">
                            <Rescope bind="user" useParentLayout>
                                <TextField value-bind="email" required label="Email" viewMode />
                                <TextField value-bind="first_name" required label="First Name" />
                                <TextField value-bind="last_name" required label="Last Name" />
                                <AsyncButton
                                    onClick={async (e, { store }) => {
                                        let { first_name, last_name } = store.getData();
                                        //let user = await putUserData({ first_name, last_name });
                                        store.set('$root.user', user);
                                    }}
                                >
                                    Save
                        </AsyncButton>
                            </Rescope>
                        </LabelsLeftLayout>
                    </div>
                    <div class="ml-20">
                        <div class="mb-4">Photo</div>
                        <div class="w-32 h-32 bg-gray-300 relative border-4 border-gray-400 box-content">
                            <img
                                src-tpl="{user.picture_url}?tr=h-128"
                                visible-expr="!!{user.picture_url}"
                                class="absolute w-full h-full object-cover top-0 left-0"
                            />
                        </div>
                        <UploadButton
                            url="~/api/account/picture"
                            onUploadStarting={onUploadStarting}
                            onUploadComplete={onUploadComplete}
                            class="mt-2"
                            accept="image/*"
                        >
                            Upload
                        </UploadButton>
                    </div>
                </div>
            </div>
        </main>
    </cx>
);
