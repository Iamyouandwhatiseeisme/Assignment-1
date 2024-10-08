import "./Content.css"
import * as assets from "../../assets/images/assets.js";
import Item from "../item/Item.js";
import * as descriptions from "../../assets/description.js";

const Content = () => {
    return ( 
        <main className="content">
            <div className="content-grid">
                <Item img = {assets.AmanitaMuscaria} title="Amanita Muscaria" description ={descriptions.AmanitaMuscariaDescription} />
                <Item img = {assets.AmanitaPanterina} title="Amanita Panterina" description ={descriptions.AmanitaPanterinaDescription} />
                <Item img = {assets.Shitake} title="Shitake" description ={descriptions.ShitakeDescription} />
                <Item img = {assets.Maitake} title="Maitake" description ={descriptions.MaitakeDescription} />
                <Item img = {assets.Cordyceps} title="Cordyceps" description ={descriptions.CordycepsDescription}/>
                <Item img = {assets.LionsMane} title="Lions Mane" description ={descriptions.LionsManeDescription} />
                <Item img = {assets.TurkeyTail} title="Turkey Tail" description ={descriptions.TurkeyTailDescription} />
                <Item img = {assets.Yamabushitake} title="Yamabushitake" description ={descriptions.YamabushitakeDescription} />
                <Item img = {assets.Reishi} title="Reishi" description ={descriptions.ReishiDescription}/>
                
            </div>
           
        </main>
     );
}
 
export default Content;