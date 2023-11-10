import "./Profile.css"

const Profile = ({ currentUserData }) => {
    const { name, email, entries, joined } = currentUserData
    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <dl class="lh-title pa4 mt0">
                <dt class="f4 b">Name</dt>
                <dd class="ml0">{name}</dd>
                <dt class="f4 b mt2">Email</dt>
                <dd class="ml0">{email}</dd>
                <dt class="f4 b mt2">Entries</dt>
                <dd class="ml0">{entries}</dd>
                <dt class="f4 b mt2">Joined At</dt>
                <dd class="ml0">{joined}</dd>
            </dl>
        </article>
    )
}

export default Profile;