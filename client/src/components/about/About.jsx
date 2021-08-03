import NavBar from '../navBar/NavBar';
import styles from './About.module.css'; 

export default function About(){
    return <div>
               <NavBar/> 
               <h1>About</h1> 
               <div className={styles.container}>
                <h2>This page is made by <a href="https://github.com/teslavargas">Joel Vargas</a> with React, Redux, Express, Sequelize and Postgres.</h2>
                <h2>The main idea is that you can visualize countries, filter them, and create tourist activities for them.</h2>
                <div>
                    <h2>Thanks for visiting.</h2>
                </div>
               </div>
               <div className={styles.icon}>
                        <box-icon name='world' size='lg' color='#00e4ba'></box-icon>
              </div>    

            

           </div>
}