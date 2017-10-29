import React from 'react';
import {Card, Icon, Image, Grid, Segment} from 'semantic-ui-react'


class MyProfile extends React.Component {
    state = {};


    render() {
        const logoG = 'https://ih0.redbubble.net/image.280677834.1711/flat,400x400,070,f.u2.jpg';
        return (


            <Card centered={true}>
                <Image src={logoG}/>
                <Card.Content>
                    <Card.Header>
                        Pepe
                    </Card.Header>
                    <Card.Meta>
                                        <span className='date'>
                                            Joined in 2015
                                        </span>
                    </Card.Meta>
                    <Card.Description>
                        Pepe is a popular internet mem.
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user'/>
                        over9000 Friends
                    </a>
                </Card.Content>
            </Card>

        );
    }
}

export default MyProfile;