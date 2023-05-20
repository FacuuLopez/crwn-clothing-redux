import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/user.selector"

const UserProfile = () => {
    const user = useSelector(selectCurrentUser);

    const { displayName, email, phoneNumber } = user

    return (
        <div className="mt-4 d-flex justify-content-center">
            <div className="col col-md-8 col-lg-6">
                <div className="card">
                    <div className="card-header p-1">
                        <h1 className="text-center">Your User's Profile</h1>
                    </div>
                    <div className="card-body">
                        <ul className="list-unstyled p-2 pb-0 pb-lg-1 p-lg-3">
                            <li className="nav-item">
                                <div className="input-group  mb-3 mb-lg-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Your Name:</span>
                                    </div>
                                    <input type="text" className="form-control" id="users_profile_name" value={displayName} />
                                </div>
                                <label htmlFor="users_profile_name" className="visually-hidden">Your Name:</label>
                            </li>
                            <li className="nav-item">
                                <div className="input-group mb-3 mb-lg-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Your email:</span>
                                    </div>
                                    <input type="email" className="form-control" id="users_profile_email" readOnly value={email} />
                                </div>
                                <label htmlFor="users_profile_email" className="visually-hidden">Your email:</label>
                            </li>
                            <li className="nav-item">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Your number:</span>
                                    </div>
                                    <input type="tel" className="form-control" id="users_profile_number" />
                                </div>
                                <label htmlFor="users_profile_number" className="visually-hidden">Your number:</label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default UserProfile;