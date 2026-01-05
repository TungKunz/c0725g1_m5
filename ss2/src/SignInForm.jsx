function SignInForm(){
    return(
        <>
            <div className="container py-5">
                <h3>Đăng nhập</h3>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </form>
            </div>
        </>
    )
}
export default SignInForm;