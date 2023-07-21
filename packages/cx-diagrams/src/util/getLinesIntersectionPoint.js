export function getLinesIntersectionPoint(l1x1, l1y1, l1x2, l1y2, l2x1, l2y1, l2x2, l2y2) {
   if (!isLineValid(l1x1, l1y1, l1x2, l1y2) || !isLineValid(l2x1, l2y1, l2x2, l2y2)) {
      return false;
   }

   const denominator = (l2y2 - l2y1) * (l1x2 - l1x1) - (l2x2 - l2x1) * (l1y2 - l1y1);

   if (isParallel(denominator)) {
      return false;
   }

   const ua = ((l2x2 - l2x1) * (l1y1 - l2y1) - (l2y2 - l2y1) * (l1x1 - l2x1)) / denominator;
   const ub = ((l1x2 - l1x1) * (l1y1 - l2y1) - (l1y2 - l1y1) * (l1x1 - l2x1)) / denominator;

   if (!isWithinSegment(ua, ub)) {
      return false;
   }

   const x = l1x1 + ua * (l1x2 - l1x1);
   const y = l1y1 + ua * (l1y2 - l1y1);

   return { x, y };
}

function isLineValid(x1, y1, x2, y2) {
   return x1 !== x2 && y1 !== y2;
}

function isParallel(denominator) {
   return denominator === 0;
}

function isWithinSegment(ua, ub) {
   return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
}
