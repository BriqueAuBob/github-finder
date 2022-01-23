import React, { Fragment, useState, useEffect } from "react";
import Repo from './Repo';

import { average } from "color.js";

const Profile = () => {
    const [user, setUser] = useState({} as any);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('BriqueAuBob');
    const [url, setUrl] = useState('https://api.github.com/users/BriqueAuBob');
    const [backgroundColor, setBackgroundColor] = useState('#f20f20');

    useEffect(() => {
        async function fetchUser() {
            setLoading(true);
            const user = await fetch(url);
            if(!user.ok) {
                setUser({
                    name: 'Inconnu',
                    avatar_url: 'https://i.stack.imgur.com/frlIf.png',
                    bio: 'I just don\'t exists.',
                    company: '404 Not found'
                });
                setRepos([]);
                setBackgroundColor('#77C5D5');
                setLoading(false);
                return;
            };
            const data = user.json().then(async (data) => {
                setUser(data);
                setBackgroundColor(await average(data.avatar_url + '.png', { format: 'hex' }) as string);
                const repos = await fetch(url + '/repos?per_page=100');
                setRepos(await repos.json());
                setLoading(false);
            })
        };
        fetchUser();
    }, [url]);

    const style = { '--tw-gradient-from': backgroundColor  } as React.CSSProperties;
    return (
        <Fragment>
            {loading ? (
                <div className="flex justify-center items-center text-xl font-semibold w-full h-screen">
                    Loading...
                </div>
            ) : (
                <div>
                    <div className="lg:grid lg:grid-cols-5 lg:h-screen">
                        <div className="lg:py-16 pl-4 pr-1 lg:pl-24 lg:pt-24 z-10 flex flex-col justify-between">
                            <div className="mb-8">
                                <input 
                                    type="text"
                                    className="max-w-full lg:absolute text-6xl font-bold mt-4 bg-transparent focus:outline-none" 
                                    value={query}
                                    onChange={event => setQuery(event.target.value)}
                                    onKeyDown={(event) => {
                                            if (event.key === 'Enter') {
                                                setUrl(`https://api.github.com/users/${query}`)
                                            }
                                        }
                                    }
                                ></input>
                                <div className="lg:absolute top-48 text-6xl leading-relaxed font-thin max-w-4xl">{ user.company ?? 'Available for hire' }</div>
                            </div>
                            <div>
                                <div className="text-lg font-semibold">🗒️ About me</div>
                                <div className="text-md mt-2 lg:mb-12">{ user.bio ?? 'No informations' }</div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-teal-800  to-black col-span-2 flex flex-col justify-end relative py-24 mt-16 lg:mt-0" style={style}>
                            <img src={ user.avatar_url } className="w-1/2 transform translate-x-1/4 -translate-y-8 rounded-full" />
                        </div>
                        <div className="relative py-16 px-4 lg:pl-24 lg:pt-24 col-span-2 max-h-screen lg:overflow-hidden">
                            <div className="text-lg font-semibold">📋 Repositories</div>
                            <div className="w-full max-h-full lg:overflow-y-auto mt-4 pb-72">
                                {
                                    repos.map((repo, index) => ( <div key={index} className="mb-4"><Repo repo={repo} /></div> ))
                                }
                            </div>
                            <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent w-full h-1/3 hidden lg:block"></div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default Profile;