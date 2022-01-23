const Repo = (props) => {
    const repo = props.repo;
    return (
        <a href={ repo.html_url } target="_blank" className="block bg-neutral-900 p-6 rounded-xl shadow-sm shadow-neutral-800 drop-shadow-xl">
            <div className="font-semibold text-xl">{ repo.name }</div>
            <div className="text-md mt-4">{ repo.description ?? 'No description' }</div>
        </a>
    )
};

export default Repo;