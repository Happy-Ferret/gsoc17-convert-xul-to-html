/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function() {
  /* global React */
  const PrintDialogGroupBox = () =>
    <div id="groupboxVbox">
      <PrintSettings />
      <WhatToPrint />
      <Options />
    </div>;

  window.PrintDialogGroupBox = PrintDialogGroupBox;
})();
