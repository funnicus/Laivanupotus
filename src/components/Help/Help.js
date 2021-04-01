import { Link } from "react-router-dom";

/*
 * React-component for the Help-page
 */
const Help = () => {
  return (
    <div>
      <Link to="/">
        <button title="Takaisin" className="back-button">
          ←
        </button>
      </Link>
      <h1 className="title">Ohjeet</h1>
      <p id="help-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pretium
        lectus sed ex pellentesque, interdum sagittis lorem porta. Integer nec
        massa iaculis, elementum urna id, pulvinar nisl. Nulla ac accumsan
        neque. Class aptent taciti sociosqu ad litora torquent per conubia
        nostra, per inceptos himenaeos. Donec odio purus, maximus ut lorem nec,
        convallis suscipit metus. Duis mollis odio augue. Suspendisse vitae
        dolor nec dolor tempus scelerisque at id tellus. Donec accumsan purus
        nunc, vitae tempor purus facilisis vel. Nullam eu condimentum justo. Nam
        non tortor arcu. Nam euismod faucibus accumsan. Phasellus sagittis magna
        at mi tincidunt gravida nec eget velit. Mauris dui ipsum, viverra et
        interdum vitae, tempus et turpis. Donec commodo, metus vitae fringilla
        fermentum, justo magna tincidunt augue, at consectetur turpis est et
        nulla. Mauris sit amet nisl ac ipsum molestie tempor. Sed sollicitudin
        magna at lacus ultrices, id faucibus nibh lobortis. Aenean consequat
        vehicula nulla semper pretium. Etiam eu nulla et dolor molestie finibus.
        Quisque consectetur ultricies maximus. Nulla rhoncus purus purus, quis
        sodales lorem eleifend eu. Curabitur vestibulum, arcu ut fermentum
        condimentum, sapien dolor facilisis urna, eu consequat purus nisi nec
        est. Suspendisse auctor, purus eget sodales auctor, orci sem malesuada
        dolor, quis ultrices ex mauris eu sem. Nullam et tellus dui. Sed
        consequat et magna eu venenatis. Pellentesque vel blandit elit, eget
        ultricies urna. Morbi et arcu in tortor bibendum finibus vestibulum ut
        diam. Sed erat ligula, aliquam at dapibus vitae, placerat quis eros.
        Phasellus imperdiet turpis nec maximus rhoncus. Aenean varius maximus
        diam a fringilla. Nam neque lacus, dignissim at consectetur sit amet,
        tincidunt quis felis. Pellentesque mollis orci ut dui pellentesque
        rutrum. Nulla sollicitudin augue ut tortor interdum hendrerit. Sed ac
        ultrices massa. Suspendisse tincidunt odio in lorem sodales placerat.
        Duis iaculis malesuada eros eu venenatis. Nullam quis nunc quam. Vivamus
        vulputate nec ex sit amet egestas. Vestibulum dignissim facilisis
        tortor, varius dignissim urna. Vestibulum efficitur nibh lacus, ultrices
        varius arcu tincidunt nec. Proin maximus tellus purus, vitae efficitur
        velit tempus fringilla. Suspendisse tincidunt eleifend interdum.
        Phasellus blandit pharetra justo, convallis congue arcu dapibus vitae.
        Morbi auctor risus a tortor volutpat, sit amet sagittis massa lacinia.
        In viverra ac mauris ac placerat. Praesent sodales felis et enim
        posuere, in elementum lorem sodales. Nulla vel massa lectus. Donec ac
        rhoncus augue. In ac cursus ipsum, eu sodales ipsum. Fusce tincidunt
        velit vel consectetur interdum. Phasellus mattis libero sed tortor
        rhoncus sodales. Interdum et malesuada fames ac ante ipsum primis in
        faucibus. Sed nec commodo lacus. Praesent blandit sem ut tortor egestas,
        eu volutpat lectus dignissim. Maecenas a consequat nisi. Integer eu
        laoreet ex, vitae congue tellus. Cras id mauris eget eros accumsan
        condimentum sed ac nulla. Phasellus eu neque lacus. Quisque quis mi
        lorem.
      </p>
    </div>
  );
};

export default Help;
