import  { h, Component } from 'preact';
import style from './style.css';

export default class ChannelTimeTable extends Component {
  render( { url, channelId, getPropsToChildComponent, clickVideo } ) {
    return (
        <div>
          <div>
              <ul className={style.ul}>
                  { channelId && channelId.map( (table, idx) => (
                      <li key={table}>
                          <a href={url + Number(table +1)}
                             name={table}
                             onClick={() => clickVideo(idx)}
                          >
                              {table + Number(1)}
                          </a>
                          <ul>
                              <li>
                                  {
                                      getPropsToChildComponent[table] && getPropsToChildComponent[table].map( (elem, index) =>
                                          <li key={elem.id}>
                                              <a href={ url + ( Number(table) + Number(1) ) + `${"/"}` + elem.fields.Slug} onClick={() => clickVideo(idx,index)}>
                                                  {elem.fields.Name}
                                              </a>
                                          </li>
                                      )
                                  }
                              </li>
                          </ul>
                      </li>
                  ))}
              </ul>
          </div>
        </div>
    )
  }
}
